import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import NoImage from "../assets/no_image.jpeg";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [video_src, setVideo_src] = useState("");
  const [image_src, setImage_src] = useState("");
  const [height, setHeight] = useState("");
  const [size, setSize] = useState("");
  const [imageURL, setImageURL] = useState();
  const fileReader = new FileReader();

  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      setImage_src(file);
      fileReader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Заполните название товара!");
      return;
    }

    if (!description.trim()) {
      alert("Заполните описание товара!");
      return;
    }
    if (!video_src.trim()) {
      alert("Выложите видео!");
      return;
    }

    if (!height.trim()) {
      alert("Заполните рост товара!");
      return;
    }

    if (!size.trim()) {
      alert("Заполните размер товара!");
      return;
    }

    const formDate = new FormData();
    formDate.append("title", title);
    formDate.append("price", price);
    formDate.append("description", description);
    formDate.append("video_src", video_src);
    formDate.append("image_src", image_src);
    formDate.append("height", height);
    formDate.append("size", size);
    const token = localStorage.getItem("dm_token");
    axios
      .post("http://185.100.67.103/api/products", formDate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        navigate("/products");
        toast.success("Продукт успешно создан");
      })
      .catch((error) => {
        //toast.error(error.response.data.errors[0].message)
        console.log(error);
      });
  };

  return (
    <div className="section">
      <div className="container">
        <h1>Создать новый товар</h1>
        <form onSubmit={handleAddProduct} className="form">
          <div className="form_box">
            <label htmlFor="title" className="form_label">
              Введите название товара:
            </label>
            <input
              className="input"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form_box">
            <label htmlFor="price" className="form_label">
              Введите цена товара:
            </label>
            <input
              className="input"
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.valueAsNumber)}
            />
          </div>
          <div className="form_box">
            <label htmlFor="description" className="form_label">
              Введите описание товара:
            </label>
            <textarea
              className="textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form_box">
            <label htmlFor="video" className="form_label">
              Видео:
            </label>
            <input
              className="input"
              name="video"
              type="text"
              value={video_src}
              onChange={(e) => setVideo_src(e.target.value)}
            />
          </div>
          <div className="form_box">
            <label htmlFor="image" className="file-uploader__custom-button">
              Выбирите картинку:
            </label>
            <input
              className="file-uploader__upload-button"
              id="image"
              type="file"
              onChange={handleOnChange}
            />
            <img
              src={imageURL ? imageURL : { NoImage }}
              alt="preview"
              className="file-uploader__preview"
            />
            <div>{image_src ? image_src.name : ""}</div>
          </div>
          <div className="form_box">
            <label htmlFor="height" className="form_label">
              Введите рост товара:
            </label>
            <input
              className="input"
              name="height"
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="form_box">
            <label htmlFor="size" className="form_label">
              Введите размер товара:
            </label>
            <input
              className="input"
              name="size"
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="buttons">
            <Link to="/products">
              <IoArrowBackCircleSharp className="form__link" />
            </Link>
            <button type="submit" className="form__button">
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
