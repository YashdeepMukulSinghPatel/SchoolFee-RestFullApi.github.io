const Question = require('../../../models/question');
const Option = require('../../../models/option');
const option = require('../../../models/option');
// http://localhost:3000/api/v1/options/:id/Fee
module.exports.Fee = async (req, res) => {

    try {

        let id = req.params.id;

        // check if the option exists for the question, add a new Fee by incrementing 100 rs per month fee
        await Option.findByIdAndUpdate(id, { $inc: { Fee:100 } });

        return res.status(200).json({

            message: "Fee Submitted"

        });

    } catch (err) {

        console.log('Error In Fee Submitted', err);

        return res.status(500).json({
            message: "Internal Server Error In Fee Submitted!"
        });
    }
}
// View All Student which is pay the fee.
module.exports.viewOptions = async (req, res) => {

    try {

        let displayOption = await Option.findById(req.params.id);

        if (displayOption) {

            return res.status(200).json({
                questionDisplayed: displayOption,
                message: "Options displayed successfully!!"
            });

        }

    } catch (err) {

        console.log('Error while Viewing Options', err);
        return res.status(500).json({
            message: "Internal Server Error while viewing Options!"
        });
    }


}

// http://localhost:3000/api/v1/options/:id/delete
module.exports.deleteOption = async (req, res) => {

    try {

        let id = req.params.id;
        //new
        let displayOption = await Option.findById(req.params.id);
        // Checking if Student exists
        let option = await Option.findById(id);

        // Checking if number of Fee are > 0, if true an  Student will be deleted

        if (option.Fee > 0) {

            return res.status(400).json({
                    questionDisplayed: displayOption,
                message: "Student submit the fee."

            });
        }

        // deleting option from question.options array first
        await Question.findByIdAndUpdate(option.question, { $pull: { options: id } });

        // Now deleting the option from the db
        await Option.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Student Deleted Successfully!!"
        });

    } catch (err) {

        console.log('Error in deleting Student', err);

        return res.status(500).json({
            message: "Internal Server Error in deleting Student!"
        });
    }

}