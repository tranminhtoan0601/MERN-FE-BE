import React, { useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Card, Col, Row, Spinner, Toast } from "react-bootstrap";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/addPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";

Dasboard.propTypes = {};

function Dasboard(props) {
  //contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  //start:get all posts
  useEffect(() => {
    getPosts();
  }, []);
  let body = null;
  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Wellcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                setShowAddPostModal(true);
              }}
            >
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        <Button
          className="btn-floating"
          onClick={() => setShowAddPostModal(true)}
        >
          add Post
        </Button>
      </>
    );
  }
  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* after post is added, show Toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() => setShowToast({ show: false, message: "", type: null })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
}

export default Dasboard;
