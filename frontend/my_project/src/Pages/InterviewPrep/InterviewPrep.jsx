import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

import DashboardLayout from "../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleHeader";
import QuestionCard from "../../components/cards/QuestionCard";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import AIResponsePreview from "../../components/AIResponsePreview";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatedLoader, setIsUpdatedLoader] = useState(false);

  const [explanation, setExplanation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data?.session) setSessionData(response.data.session);
    } catch (error) {
      console.error("Error fetching session:", error);
      toast.error("Failed to fetch session details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data?.data) {
        setExplanation({ explanation: response.data.data });
      } else {
        setErrorMsg("No explanation returned from server");
      }
    } catch (error) {
      console.error("Error generating explanation:", error);
      setErrorMsg("Failed to generate explanation. Try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data?.question) fetchSessionDetailsById();
    } catch (error) {
      console.error("Error pinning/unpinning question:", error);
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdatedLoader(true);
      const response = await axiosInstance.post(
        API_PATHS.SESSION.UPLOAD_MORE(sessionId)
      );
      if (response.data) {
        toast.success("More questions uploaded!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error uploading questions:", error);
      toast.error("Failed to upload more questions");
    } finally {
      setIsUpdatedLoader(false);
    }
  };

  return (
    <DashboardLayout>
      {isLoading && <SpinnerLoader />}

      {sessionData && (
        <>
          <RoleInfoHeader
            role={sessionData.role || ""}
            topicsToFocus={sessionData.topicsToFocus || ""}
            experience={sessionData.experience || ""}
            questions={sessionData.questions?.length || "-"}
            description={sessionData.description || ""}
            lastUpdated={
              sessionData.updatedAt
                ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                : ""
            }
          />

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Interview Q & A</h2>

            {/* Vertical list — one question per row */}
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, delay: index * 0.02 }}
                    className="w-full"
                  >
                    <QuestionCard
                      question={data.question}
                      answer={data.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Load More */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={uploadMoreQuestions}
                  disabled={isLoading || isUpdatedLoader}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isUpdatedLoader ? <SpinnerLoader /> : "Load More Questions"}
                </button>
              </div>
            </div>
          </div>

          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-semibold">
                <LuCircleAlert className="text-xl" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </>
      )}
    </DashboardLayout>
  );
};

export default InterviewPrep;
