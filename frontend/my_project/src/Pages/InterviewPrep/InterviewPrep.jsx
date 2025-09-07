import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

import DashboardLayout from "../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleHeader";
import QuestionCard from "../../components/cards/QuestionCard";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import AIResponsePreview from "../../components/AIResponsePreview"; // ✅ fixed path

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [sessionData, setSessionData] = useState(null);
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatedLoader, setIsUpdatedLoader] = useState(false);

  const [explanation, setExplanation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      toast.error("Failed to fetch session details");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Concept Explanation
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

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation. Try again later");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      if (response.data?.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Add more questions to a session
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

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

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

            <div className="grid grid-cols-12 gap-4">
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
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

              {/* ✅ Load More Button */}
              <div className="col-span-12 flex justify-center mt-4">
                <button
                  onClick={uploadMoreQuestions}
                  disabled={isLoading || isUpdatedLoader}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isUpdatedLoader ? (
                    <>
                      <SpinnerLoader /> {/* ✅ removed size prop */}
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <LuListCollapse />
                      <span>Load More Questions</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Drawer for explanation */}
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
