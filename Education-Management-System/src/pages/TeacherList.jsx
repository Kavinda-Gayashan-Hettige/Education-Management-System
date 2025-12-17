import React, { useEffect, useState } from "react";
import { getAllTeachers } from "../services/teacherService";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getAllTeachers()
      .then(data => setTeachers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map(t => (
          <li key={t.teacherID}>{t.name} - {t.course}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
