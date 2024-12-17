import ClassModel from "./class.model.js";

export async function addUser(req, res) {
  try {
    console.log(req.body);

    const { name, teacher_name } = req.body;

    const result = await ClassModel.create({ name, teacher_name });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Hatolik boldi" + err.message);
  }
}

export async function getAllUsers(req, res) {
  try {
    const result = await ClassModel.findAll({
      // include: [
      //   {
      //     model: ProductModel,
      //   },
      // ],
    });
    res.send(result);
  } catch (err) {
    res.status(500).send("Hatolik boldi" + err.message);
  }
}

export async function get(req, res) {
  try {
    const { id } = req.params;

    const result = await ClassModel.findOne({ where: { id } });
    res.send(result);
  } catch (err) {
    console.log(err);

    res.send("Error: " + err.message);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;

    const old = await ClassModel.findOne({ where: { id } });
    if (!old) {
      return res.status(404).send("Record not found");
    }

    const updatedData = { ...old.toJSON(), ...req.body };

    const { name, teacher_name } = updatedData;

    const [updatedRowsCount] = await ClassModel.update(
      { name, teacher_name }, { where: { id } }  
    );

    if (updatedRowsCount === 0) {
      return res.status(404).send("Update failed");
    }

    res.status(200).send("Record updated successfully");
  } catch (err) {
    console.error(err);

    res.status(500).send("Error: " + err.message);
  }
}

export async function deletee(req, res) {
  try {
    const { id } = req.params;

    const result = await ClassModel.destroy({ where: { id } });
    res.send("O'chdi");
  } catch (err) {
    console.log(err);

    res.send("Erorr: " + err.message);
  }
}

// export async function loginUser(req, res) {
//   try {
//     const user = req.body;

//     const dbUser = await ClassModel.findOne({ where: { email: user.email } });

//     if (!dbUser) {
//       res.send("Bunday email oldin ro'yxatdan o'tmagan");
//     }

//     const checkPassword = await bcrypt.compare(user.password, dbUser.password);

//     if (!checkPassword) {
//       res.send("Error: " + err.message);
//     }

//     const accessToken = generateAccessToken({ email: user.email });

//     res.send(accessToken);
//   } catch (err) {
//     console.log(err);

//     res.send("Error: " + err.message);
//   }
// }

// function generateAccessToken(data) {
//   return jwt.sign(data, getConfig("JWT_ACCCES_SECRET"), { expiresIn: "10m" });
// }
