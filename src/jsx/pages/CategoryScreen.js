import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory, getCategory } from "../../actions/categoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import debounce from "lodash.debounce";
import checkPermission from "./checkpermission";

const CategoryScreen = ({ history }) => {
  const [inputValue, setInputValue] = useState("");
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categoryError, category } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading: loadingDelete, error: errorDelete } = categoryDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const deleteCategoryHandler = async (id) => {
    let formdata = new FormData();
    formdata.set("id", id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteCategory(id, dispatch));
    }
  };
  const debouncedSave = useCallback(
    debounce((newValue) => dispatch(getCategory(newValue)), 1000),
    []
  );

  const updateValue = (newValue) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  };

  return (
    <>
      {loading || loadingDelete ? (
        <Loader />
      ) : categoryError || errorDelete ? (
        <Message variant="danger">{categoryError}</Message>
      ) : (
        <div>
          <div className="d-flex justify-content-between my-4">
            <div className="d-flex w-50">
              <input
                className="form-control shadow-none rounded mx-2"
                placeholder="Search Categories"
                onChange={(input) => updateValue(input.target.value)}
                value={inputValue}
                autoFocus
              />
            </div>

            <div>
              <Link to="/category/addcategory">
                <Button variant="secondary mb-2">Add New Category</Button>
              </Link>
            </div>
          </div>

          <Card>
            <Card.Body>
              <Table responsive className="header-border ">
                <thead>
                  <tr>
                    <th> Id</th>
                    <th> Name</th>
                    <th> Image</th>
                  </tr>
                </thead>
                <tbody>
                  {category &&
                    category.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            history.push(`/category/addcategory/${item.id}`);
                          }}
                        >
                          {item.id}
                        </td>
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            history.push(`/category/addcategory/${item.id}`);
                          }}
                        >
                          {item.name || item.name_en}
                        </td>
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            history.push(`/category/addcategory/${item.id}`);
                          }}
                        >
                          <Card.Img
                            style={{
                              height: "80px",
                              width: "80px",
                              objectFit: "contain",
                            }}
                            src={item.fullimageurl}
                            variant="top"
                          />
                        </td>

                        <td>
                          <div className="d-flex justify-content-around">
                            <i
                              className="fa fa-trash"
                              style={{
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() => {
                                checkPermission(history, "category.delete");
                                deleteCategoryHandler(item.id);
                              }}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default CategoryScreen;
