import { Component } from "react";
import CharList from "../../components/charList/CharList";
import Alert from "@mui/material/Alert";
class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromError(error) {
    if (error) {
      return { error: true };
    }
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
      return <CharList />;
    }
  }
}

export default ErrorBoundary;
