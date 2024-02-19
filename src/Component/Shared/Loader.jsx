import { Button, Spinner } from "keep-react";

const Loader = () => {
  return (
    <div className="items-center justify-center">
      <Button type="primary" size="md">
        <span className="pr-2">
          <Spinner color="info" size="md" />
        </span>
        Loading...
      </Button>
    </div>
  );
};

export default Loader;
