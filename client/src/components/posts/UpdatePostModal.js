import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  const closeDialog = () => {
    setShowUpdatePostModal(false);
  };
  const [updatedPost, setUpdatedPost] = useState(post);
  const [displayingPost, setdisplayingPost] = useState({});

  const {
    title = "",
    description = "",
    url = "",
    status = "",
  } = displayingPost;

  useEffect(() => {
    setdisplayingPost(post);
  }, [post]);

  const onChangeUpdatedForm = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };
  //   const resertAddPostData = () => {
  //     setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
  //     setShowAddPostModal(false);
  //   };

  return (
    <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making Progerss?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={onChangeUpdatedForm}
              required
              aria-describedby="title-help"
            />
            <Form.Text id="title-help" muted>
              Require
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Url"
              name="url"
              value={url}
              onChange={onChangeUpdatedForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              placeholder="status"
              name="status"
              value={status}
              onChange={onChangeUpdatedForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value=" LEARNING"> LEARNING</option>
              <option value=" LEARNED"> LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancle
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default UpdatePostModal;
