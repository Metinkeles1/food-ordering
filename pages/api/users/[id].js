import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";

const handler = async (req, res) => {
    await dbConnect();
    const { method, query: {id} } = req;

    if (method === "GET") {
        try {
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            console.log(error)
        }
    }

}

export default handler