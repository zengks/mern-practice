import expressAsyncHandler from "express-async-handler";

const authUser = expressAsyncHandler(async (req, res) => {
    const { name, email } = req.body
    console.log(req)
    res.json({
        name,
        email,
    })
})

export { authUser }