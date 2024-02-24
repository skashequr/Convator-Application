import { useEffect, useState } from "react";

const useIssue = () => {
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ourconvert.vercel.app/task");
        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }
        const data = await response.json();
        setIssues(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to prevent memory leaks
    return () => {};
  }, []); // Empty dependency array ensures useEffect runs only once

  return [loading, issues];
};

export default useIssue;
