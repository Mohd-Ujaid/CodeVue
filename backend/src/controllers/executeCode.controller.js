import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {

    try {

        const {source_code , language_id , expected_outputs , problemId} = req.body;

        const userId = req.user.id;

        // validate testcases 

        if(!Array.isArray(stdin) || stdin.length == 0 || !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length ) {
            return res.status(400).json({
                error:"Invalid or Missing test cases"
            })
        }


        // prepare each testcases for judge0

        const submissions = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
            // base64_encoded: false,
            // wait:false

        }));

        // send this batch of submission to judge0


        const submitResponse = await submitBatch(submissions)



        const tokens = submitResponse.map((res) => res.token)

        // poll judge0 dor result of all submitted test cases 

        const results = await pollBatchResults(tokens)

        console.log("result :", results);

        res.status(200).json({
            message:"code executed"
        })

        
    } catch (err) {

        
    }

}
