import { useEffect, useState } from "react";

import axios from "axios";
import IssueCard from "./IssueCard";

const IssueFeedback = () => {
  const [issuedata, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ourconvert.vercel.app/task")
      .then((response) => {
        setData(response.data); // Assuming the data is in response.data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  console.log(issuedata);

  return (
    <div className="grid md:grid-cols-2 gap-6 text-transparent">
      {/* Map through the issuedata array and render an IssueCard component for each item */}
      {issuedata.map((issuedata) => (
        <IssueCard key={issuedata._id} issue={issuedata} />
      ))}
    </div>
  );
};

export default IssueFeedback;
