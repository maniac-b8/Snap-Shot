import React, { useState } from "react";

export default function NewPostForm({ onSubmit }) {
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If no image selected, return early
    if (!imageFile) return;

    try {
      const imageUrl = await uploadAndResizeImage(imageFile);
      onSubmit({ imageUrl, caption });
      // Clear form fields after successful post creation
      setImageFile(null);
      setCaption("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  // this works for some photos however still overloads payload and need to
  //switch to AWS S3 for better img hosting
  const uploadAndResizeImage = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 500;
          const maxHeight = 500;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const resizedImageUrl = canvas.toDataURL("image/jpeg");

          resolve(resizedImageUrl);
        };

        img.onerror = (error) => {
          reject(error);
        };
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Choose Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>
      <div>
        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
}
