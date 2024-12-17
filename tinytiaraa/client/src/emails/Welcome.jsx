// Import necessary modules
import { Button, Html } from "@react-email/components";
import React from "react";

// Define the Welcome component
const Welcome = () => {
  return (
    <Html>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
};

// Export the Welcome component as default
export default Welcome;