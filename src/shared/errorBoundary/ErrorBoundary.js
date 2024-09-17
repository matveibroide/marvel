import { Component } from "react";
import Alert from "@mui/material/Alert";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <Alert severity="error">
          Sorry! Something gone wrong, try again later...
        </Alert>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
