import Head from "next/head";
import { useState, useContext, useEffect } from "react";

import Link from "next/link";
import { AuthContext } from "~/context/AuthContext";
import axios from "~/server/axios";
import { useRouter } from "next/router";
// import { signOut, useSession } from "next-auth/react";

export default function LayoutMain({ children }) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const auth = useContext(AuthContext);
  // const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  function handleSideMenu() {
    setSideMenuOpen(!sideMenuOpen);
  }
  useEffect(() => {
    console.log("your role", auth.role);
  }, [auth.role]);

  useEffect(() => {
    async function getAuthStatus() {
      try {
        await axios.get("/auth/status");
      } catch (err) {
        console.log(err);
      }
    }
    getAuthStatus();
  }, []);

  async function handleLogOut() {
    await axios.post("/auth/logout");
    router.push("/auth");
  }

  return (
    <>
      <main
        className={`pink-theme ${
          sideMenuOpen ? "sidemenu-open menuactive" : ""
        }`}
      >
        <div className="sidebar">
          <div className="row mx-0">
            <div className="col">
              <h5 className="subtitle text-uppercase">
                <span>منو</span>
              </h5>
              <div className="list-group main-menu">
                {/* <Link
                  href="/"
                  className="list-group-item list-group-item-action"
                  onClick={handleSideMenu}
                >
                  داشبورد
                </Link> */}
                {auth.role == "Admin" && (
                  <>
                    {" "}
                    <Link
                      href="/categories"
                      className="list-group-item list-group-item-action"
                      onClick={handleSideMenu}
                    >
                      دسته بندی گزارشات
                    </Link>
                    <Link
                      href="/users"
                      className="list-group-item list-group-item-action"
                      onClick={handleSideMenu}
                    >
                      کاربران
                    </Link>
                  </>
                )}
                {auth.role == "Apa" && (
                  <Link
                    href="/reports/submit"
                    className="list-group-item list-group-item-action"
                    onClick={handleSideMenu}
                  >
                    ثبت گزارش
                  </Link>
                )}

                <Link
                  href="/reports"
                  className="list-group-item list-group-item-action"
                  onClick={handleSideMenu}
                >
                  گزارشات
                </Link>
                {/* <Link
                  href="/reports/ranking"
                  className="list-group-item list-group-item-action"
                  onClick={handleSideMenu}
                >
                  رتبه ها
                </Link> */}

                {/* {sessionStatus == "authenticated" ? (
                  <button
                    href="login.html"
                    className="list-group-item list-group-item-action mt-4"
                    onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  >
                    خروج از حساب
                  </button>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="list-group-item list-group-item-action mt-4"
                    onClick={handleSideMenu}
                  >
                    ورود / ثبت نام
                  </Link>
                )} */}
                <span
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLogOut()}
                >
                  خروج از حساب
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="wrapper"
          onClick={() => {
            if (sideMenuOpen) setSideMenuOpen(!sideMenuOpen);
          }}
        >
          <div className="header">
            <div className="row no-gutters">
              <div className="col-auto">
                <button
                  className="btn btn-link text-dark menu-btn"
                  onClick={handleSideMenu}
                >
                  <img src="/img/menu.png" alt="" />
                  {/* <span className="new-notification" /> */}
                </button>
              </div>
            </div>
          </div>

          <div className="container">{children}</div>
        </div>
      </main>
    </>
  );
}
