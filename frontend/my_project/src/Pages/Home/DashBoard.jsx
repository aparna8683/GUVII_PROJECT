import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import SummaryCard from "../../components/cards/SummaryCards";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    // Logic to fetch sessions goes here
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    // Logic to delete a session goes here
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);
  useEffect(() => {
    console.log("Sessions array:", sessions);
  }, [sessions]);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6">
          {sessions.map((data, index) => (
            <SummaryCard
              key={data._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data.role || ""}
              topicsToFocus={data.topicsToFocus || ""}
              experience={data.experience || ""}
              questions={data.questions?.length || "-"}
              description={data.description || ""}
              lastUpdated={
                data.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        {/* Floating Add New Button */}
        <button
          className="fixed bottom-6 right-6 h-14 w-14 md:h-16 md:w-16 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-2xl font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
          onClick={() => setOpenCreateModal(true)}
          title="Add New"
        >
          <LuPlus />
        </button>
      </div>

      {/* Modal with Close Button */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader={false} // Show header so the × button is visible
      >
        <CreateSessionForm />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
