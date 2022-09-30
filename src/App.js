import "./styles.css";
import * as yup from "yup";
import { Formik } from "formik";
import { useEffect, useState } from "react";

const FileSchema = yup.object().shape({
  file: yup.mixed().required()
});

function App() {
  const [state, setState] = useState({ loading: false, thumb: null });
  const Thumb = (file) => {
    function checkForFile() {
      if (state.thumb === null) {
        return;
      } else {
        setState({ loading: true }, () => {
          let reader = new FileReader();
          reader.onloadend = () => {
            setState({ loading: false, thumb: reader.result });
          };
          reader.readAsDataURL(file);
        });
      }
    }
    useEffect(() => {
      checkForFile();
    });
    if (!file) {
      return null;
    } else if (state.loading) {
      return <p>loading...</p>;
    } else
      return (
        <img
          src={state.thumb}
          alt={file.name}
          className="img-thumbnail mt-2"
          height={60}
          width={300}
        />
      );
  };
  return (
    <div className="App">
      <Formik
        initialValues={{ file: null }}
        onSubmit={(values) => {
          alert(
            JSON.stringify(
              {
                fileName: values.file.name,
                type: values.file.type,
                size: `${values.file.size} bytes`
              },
              null,
              2
            )
          );
        }}
        validationSchema={FileSchema}
      >
        {({ values, handleSubmit, setFieldValue }) => {
          return (
            <form>
              <div className="form-group">
                <label htmlFor="file">File upload</label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  className="form-control"
                />
                <Thumb file={values.file} />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                submit
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;
