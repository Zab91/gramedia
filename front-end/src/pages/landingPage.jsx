import React from "react";
import { Navigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const Homepage = () => {
  return (
    <>
      <div>
        Home Page
        <Button variant="primary" type="submit" size="lg">
          <Link to="/register">Click Me</Link>
        </Button>
      </div>
    </>
  );
};
