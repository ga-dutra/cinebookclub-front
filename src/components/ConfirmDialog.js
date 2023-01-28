import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import styled from "styled-components";

export default function ConfirmDialog({
  confirmDialog,
  setConfirmDialog,
  img,
  title,
}) {
  return (
    <Dialog open={confirmDialog.isOpen}>
      <Wrapper>
        <DialogTitle>
          <BookImage src={img}></BookImage>
        </DialogTitle>
        <DialogContent>
          <h6>{title} ?</h6>
        </DialogContent>
        <DialogActions>
          <Button color={"green"}>Sim</Button>
          <Button
            color={"red"}
            onClick={() =>
              setConfirmDialog({
                ...confirmDialog,
                isOpen: false,
              })
            }
          >
            Não
          </Button>
        </DialogActions>
      </Wrapper>
    </Dialog>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: auto;
  max-height: 320px;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  h6 {
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 500;
    font-size: 24px;
  }
`;
const Button = styled.button`
  width: 60px;
  height: 30px;
  margin: 0 14px;
  background-color: ${(props) => props.color};
  font-family: "Barlow Condensed", sans-serif;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
`;

const BookImage = styled.img`
  width: 90px;
  height: 130px;
  margin-bottom: -12px;
`;