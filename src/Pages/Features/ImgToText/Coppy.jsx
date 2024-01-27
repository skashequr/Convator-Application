import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
// import { toast } from "react-toastify";
import toast from 'react-hot-toast';



export default function Copy({ text }) {
  const [value, setValue] = useState("Try copy this :) Button UI will change!");
  const [isCopied, setCopied] = useState(false);
  const notify = () => toast('coppy done',{ icon: '✅'});
  useEffect(() => {
    setValue(text);
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isCopied, text]);

  return (
    <div>
      <p >
        {value}
        <div role="button" tabIndex={0}>
          <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
            <MdContentCopy
              onClick={notify}
              style={{ cursor: "pointer" }}
            />
          </CopyToClipboard>
        </div>
      </p>
    </div>
  );
}

