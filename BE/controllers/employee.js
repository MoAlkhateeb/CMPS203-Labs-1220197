let employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

exports.deleteEmployee = async (req, res, next) => {
  const id = req.params["id"];

  employee = employee.filter((emp) => emp.id != id);

  res.status(200).json({ detail: `Successfully deleted` })
};

exports.createEmployee = async (req, res, next) => {
  let id = req.body.id;
  let name = req.body.name;

  if (!id || !name) {
    return res.status(400).json({detail: "Id and Name are required."});
  }

  for (let emp of employee) {
    if (emp.id == id) {
      return res.status(400).json({detail: "An employee with the id already exists."});
    }
  }

  employee.push(req.body)
  res.status(200).json({ detail: `Successfully Created ${req.body.id}` });
};
