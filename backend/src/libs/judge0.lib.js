import axios from "axios";

export const getJudge0LanguageId = language => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return languageMap[language.toUpperCase()] || null;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// export const pollBatchResults = async (tokens) => {
//     try {

//     while(true) {
//         const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch` , {
//         params : {
//             tokens : tokens.join(","),
//             base64_encoded:false
//         }
//     })

//     const results = data.submissions;
//     console.log("result------------------->" , results);

//     const isAllDone = results.every((r) => {
//     //    r.status.id !==1 && r.status.id !== 2
//        r.status.id >2
//     })

//     if(isAllDone) {
//         return results
//     }

//     await sleep(2000)
//     }

// } catch (err) {

//     console.error(" error in poll batch", err);

//     res.status(400).json({message : "error in poll batch"})

// }

// }

// new code

export const pollBatchResults = async (
  tokens,
  maxAttempts = 30,
  intervalMs = 2000
) => {
  try {
    let attempts = 0;

    while (attempts < maxAttempts) {
      const {data} = await axios.get(
        `${process.env.JUDGE0_API_URL}/submissions/batch`,
        {
          params: {
            tokens: tokens.join(","),
            base64_encoded: false,
          },
        }
      );

      const results = data.submissions;
      console.log("Polling results: ", results);

      const isAllDone = results.every(r => r.status.id > 2);

      if (isAllDone) {
        return results;
      }

      attempts++;
      await sleep(intervalMs);
    }

    throw new Error(`Polling exceeded max attempts (${maxAttempts})`);
  } catch (error) {
    console.error("Error in pollBatchResults:", error);
    throw error; // Propagate error to caller for proper handling
  }
};

//new code

export const submitBatch = async submissions => {
  try {
    const {data} = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
      {
        submissions,
      }
    );

    console.log("submission results ", data);
    return data;
  } catch (err) {
    console.error("error in submit batch : ", err);
  }
};

export function getLanguageName(languageId) {
  const LANGUAGE_NAME = {
    63: "Javascript",
    71: "Python",
    62: "Java",
  };

  return LANGUAGE_NAME[languageId] || "unknown";
}
