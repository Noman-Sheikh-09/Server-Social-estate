const TaskModal = require("./TaskModal");

const getTask = async (req, res) => {
  try {
    const resValue = await TaskModal.find();
    // console.log("get from db", resValue);
    let response = {
      status: 200,
      message: "successfully found",
      data: resValue,
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 201,
      message: error,
    };

    console.log(error);
    res.json(response);
  }
};

const addTask = async (req, res) => {
  const newTask = {
    title: req.body.title,
    description: req.body.description,
    imageUrl:req.body.imageUrl,
    price:req.body.price,
    category:req.body.category,
    location:req.body.location,
    phone:req.body.phone,
    createdAt: new Date(),
  };
  console.log(newTask);
  const resValue = new TaskModal(newTask);

  try {
    await resValue.save();
    let response = {
      status: 200,
      message: "successfully Created",
      data: resValue,
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 200,
      message: error,
    };
    res.json(response);
  }
};
const updateTask = async (req, res) => {
  let updateTask = {
    title: req.body.title,
    description: req.body.description,
    imageUrl:req.body.imageUrl,
    price:req.body.price,
    category:req.body.category,
  };

  console.log("data in params", req.params.id);
  try {
    await TaskModal.updateOne({ _id: req.params.id }, updateTask);
    let response = {
      status: 200,
      message: "successfully updated",
      data: updateTask,
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 401,
      message: error,
    };
    res.json(response);
  }
};
const deleteTask = async (req, res) => {
  try {
    await TaskModal.deleteOne({ _id: req.params.id });
    let response = {
      status: 200,
      message: "successfully Deleted",
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 200,
      message: error,
    };
    res.json(response);
  }
};

module.exports = {
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
