import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./store/thunk";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { usersSlice } from "./store/slice";

function App() {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isFilterAuth, setIsFilterAuth] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const searchHandler = (e) => {
    e.preventDefault();
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setIsFilterAuth(true);
    dispatch(getUsers());
  };

  const deleteHandler = (id) => {
    dispatch(usersSlice.actions.deleteUsers(id));
    setFilteredUsers(filteredUsers.filter((el) => el.id !== id));
  };

  return (
    <>
      <ContainerSearch onSubmit={searchHandler}>
        <TextField
          label="Name"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit
        "
        >
          Search
        </Button>
      </ContainerSearch>
      <Div>
        {(isFilterAuth ? filteredUsers : users)?.map((el, i) => (
          <Container key={i}>
            <img src={el.image} alt="image" />
            <h2>{el.name}</h2>
            <h3>{el.gender}</h3>
            <h4>{el.status}</h4>
            <h4>{el.species}</h4>
            <Button variant="contained" onClick={() => deleteHandler(el.id)}>
              Delete
            </Button>
          </Container>
        ))}
      </Div>
    </>
  );
}

export default App;

const Container = styled("div")`
  width: 300px;
  text-align: center;
  margin: 20px;
  border-radius: 22px;
  overflow: hidden;
  background-color: silver;
  button {
    margin: 20px;
  }
`;
const Div = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const ContainerSearch = styled("form")`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
