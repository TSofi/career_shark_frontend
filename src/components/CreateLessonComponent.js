import React, { useState } from "react";
import { createLesson } from "./api"; // Import your API function

const CreateLessonComponent = () => {
  const [name, setName] = useState("");
  const [linkToResources, setLinkToResources] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lesson = { name, link_to_resources: linkToResources };
    await createLesson(lesson);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Lesson Name"
        required
      />
      <input
        type="text"
        value={linkToResources}
        onChange={(e) => setLinkToResources(e.target.value)}
        placeholder="Link to Resources"
        required
      />
      <button type="submit">Create Lesson</button>
    </form>
  );
};

export default CreateLessonComponent;
