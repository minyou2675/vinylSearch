import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BatchOverview() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("");

  const fetchStatus = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/batch`);
    console.log(res);
    const data = await res.json();
    setJobs(data);
  };

  const runJob = async (jobName) => {
    console.log(jobName);
    setStatus(`▶ 수동 실행 중... (${jobName})`);
    await fetch(`${import.meta.env.VITE_API_URL}/api/batch/${jobName}/run`, {
      method: "POST",
    });
    await fetchStatus();
    setStatus(`✅ 실행 완료 (${jobName})`);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">🗂️ 배치 작업 현황</h1>
      <p className="mb-2 text-sm text-gray-600">{status}</p>

      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Job명</th>
            <th className="border p-2">최근 실행 시간</th>
            <th className="border p-2">작업 결과</th>
            <th className="border p-2">수동 실행</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border p-2">{job.jobName}</td>
              <td className="border p-2">
                {job.lastExecutedTime
                  ? new Date(job.lastExecutedTime).toLocaleString()
                  : "-"}
              </td>
              <td
                className={`border p-2 font-bold ${
                  job.lastStatus === "SUCCESS"
                    ? "text-green-600"
                    : job.lastStatus === "FAIL"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {job.lastStatus}
              </td>
              <td className="border p-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => runJob(job.jobName)}
                >
                  ▶ 실행
                </button>
                <button
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => navigate(`/batch/${job.jobName}/logs`)}
                >
                  📝 로그 보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
