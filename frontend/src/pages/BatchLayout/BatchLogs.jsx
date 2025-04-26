import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BatchLogs() {
  const { jobName } = useParams();
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/batch/${jobName}/logs`
    );
    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, [jobName]);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">📄 {jobName} 실행 로그</h1>
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">시작</th>
            <th className="p-2 border">종료</th>
            <th className="p-2 border">상태</th>
            <th className="p-2 border">메시지</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-2 border">
                {new Date(log.startTime).toLocaleString()}
              </td>
              <td className="p-2 border">
                {new Date(log.endTime).toLocaleString()}
              </td>
              <td
                className={`p-2 border font-bold ${
                  log.status === "SUCCESS" ? "text-green-600" : "text-red-600"
                }`}
              >
                {log.status}
              </td>
              <td className="p-2 border">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
