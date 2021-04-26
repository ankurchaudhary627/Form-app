const getAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getText = (name, email, dob, phone) => {
  return (
    <div>
      <p>{`Name: ${name}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Date of Birth: ${dob}`}</p>
      <p>{`Phone number: ${phone}`}</p>
    </div>
  );
};

export {
  getAge,
  getText,
};