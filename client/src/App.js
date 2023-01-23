import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ShowBlog from "./components/BlogView";
import ProfilePage from "./components/ProfilePage";
import BlogPost from "./components/BlogPost";

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/me").then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    console.log(data);
                    if (data.errors) {
                    } else {
                        setUser(data);
                        const url = window.location.href.split(
                            "http://localhost:4000"
                        );
                        if (url[1] === "/login" || url[1] === "/signup") {
                            navigate("/");
                        }
                    }
                });
            } else {
                const url = window.location.href.split("http://localhost:4000");
                if (url[1] !== "/signup") {
                    navigate("/login");
                }
            }
        });
    }, [navigate]);



    return (
        <div className="App">
            {user ? <NavBar user={user} setUser={setUser} /> : null}
            <Routes>
                <Route
                    path="/login"
                    element={<Login user={user} setUser={setUser} />}
                />
                <Route path="/signup" element={<Signup />} />
                {user ? (
                    <Route
                        path={`/${user.username}`}
                        element={<ProfilePage user={user} />}
                    />
                ) : null}

                <Route path={`/blogs/:id`} element={<ShowBlog user={user}/>} />
                <Route
                    path="/post"
                    element={
                      <BlogPost user={user}/>
                    }
                />
                <Route
                    path="/"
                    element={
                        <HomePage
                            navigate={navigate}
                            user={user}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
