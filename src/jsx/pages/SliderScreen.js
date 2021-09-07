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
import { deleteSlider, getSlider } from "../../actions/sliderActions";

const SliderScreen = ({ history }) => {
  const [inputValue, setInputValue] = useState("");
  const sliderList = useSelector((state) => state.sliderList);
  const { loading, slidersError, sliders } = sliderList;

  const sliderDelete = useSelector((state) => state.sliderDelete);
  const { loading: loadingDelete, error: errorDelete } = sliderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSlider());
  }, [dispatch]);

  const deleteSliderHandler = async (id) => {
    let formdata = new FormData();
    formdata.set("delete", id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteSlider(id));
    }
  };

  return (
    <>
      {loading || loadingDelete ? (
        <Loader />
      ) : slidersError || errorDelete ? (
        <Message variant="danger">{slidersError || errorDelete}</Message>
      ) : (
        <div>
          <div className="d-flex justify-content-between my-4">
            <div>
              <Link to="/addnewslider">
                <Button variant="secondary mb-2">Add New Slider</Button>
              </Link>
            </div>
          </div>
          <Card>
            <Card.Body>
              <Table responsive className="header-border ">
                <thead>
                  <tr >
                    <th> Id</th>
                    <th> Images</th>
                    <th> Aspect Ratio</th>
                    <th> Location</th>
  
                  </tr>
                </thead>
                <tbody>
                  {sliders && sliders.bottom && (
                    <tr >
                      <td
                        style={{
                          cursor: "pointer",
                          height:'100px'
                        }}
                        onClick={() => {
                          history.push(`/slider/edit/${sliders.bottom[0].id}`);
                        }}
                      >
                        {sliders.bottom[0].id}
                      </td>

                      {sliders.bottom &&
                        sliders.bottom.map((item, index) => {
                          return (
                            <span className="mx-4 my-4">
                              <Card.Img
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  objectFit: "contain",
                                }}
                                src={item.fullurl}
                                variant="top"
                              />
                            </span>
                          );
                        })}

                      <td
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          history.push(`/slider/edit/${sliders.bottom[0].id}`);
                        }}
                      >
                        {sliders.bottom[0].aspectratio}
                      </td>

                      <td
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          history.push(`/slider/edit/${sliders.bottom[0].id}`);
                        }}
                      >
                        {"Bottom"}
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
                              deleteSliderHandler(sliders.bottom[0].id);
                            }}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  )}
                  {sliders && sliders.top && (
                    <tr>
                      <td
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          history.push(`/slider/edit/${sliders.top[0].id}`);
                        }}
                      >
                        {sliders.top[0].id}
                      </td>

                      {sliders.top &&
                        sliders.top.map((item, index) => {
                          return (
                            <span className="mx-4 my-3 h-auto">
                              <Card.Img
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  objectFit: "contain",
                                }}
                                src={item.fullurl}
                                variant="top"
                              />
                            </span>
                          );
                        })}

                      <td
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          history.push(`/slider/edit/${sliders.top[0].id}`);
                        }}
                      >
                        {sliders.top[0].aspectratio}
                      </td>

                      <td
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          history.push(`/slider/edit/${sliders.top[0].id}`);
                        }}
                      >
                        {"top"}
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
                              deleteSliderHandler(sliders.top[0].id);
                            }}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default SliderScreen;
