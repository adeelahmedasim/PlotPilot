import {
  AuthBindings,
  Authenticated,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2 ,
  RefineThemes,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";

import { Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";


import { Login,
  Home, Agents, MyProfile, PropertyDetails, AllProperties,
  AgentProfile, EditProperty, CreateProperty, ComingSoon

} from "./pages";

import { parseJwt } from "./utils/parse-jwt";

import { AccountCircleOutlined, 
  ChatBubbleOutline, 
ChatBubbleOutlineOutlined,
PeopleAltOutlined,
StarBorderOutlined,
StarOutlineRounded,
VillaOutlined
} from "@mui/icons-material";

import DashboardIcon from '@mui/icons-material/Dashboard';

import Logo from "./components/Logo"

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;


      if (profileObj){
        const response = await fetch('https://plotpilot.onrender.com/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify({
             name: profileObj.name,
             email: profileObj.email,
             avatar: profileObj.picture,
          })
          }
        )

        const data = await response.json();

        if (response.status=== 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
            userid:data._id
          })
        )}

        else {
            return Promise.reject()
        }


        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },


    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
    <ThemeProvider theme={RefineThemes.Blue}>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("https://plotpilot.onrender.com/api/v1")}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  
                  {
                    name: "Dashboard",
                    list: "/dashboard",
                    icon:<DashboardIcon/>
                    
                  },
                  
                  {
                    name: "properties",
                    list: "/properties",
                    show: "/properties/show/:id",
                    edit: "/properties/edit/:id",
                    create: "/properties/create",
                    icon:<VillaOutlined/>
                    
                  },
                  {
                    name: "agents",
                    list: "/agents",
                    show:  "/agents/show/:id",
                    icon:<PeopleAltOutlined/>
                    
                  },
                  {
                    name: "reviews",
                    list: "/reviews",
                    icon: <StarOutlineRounded/>
                    
                  },
                  {
                    name: "messages",
                    list: "/messages",
                    icon:<ChatBubbleOutline/>
                    
                  },
                  {
                    name: "my-profile",
                    options:{label:"My Profile"},
                    list: "/my-profile",
                    icon: <AccountCircleOutlined/>,
                    
                    
                  },
                  


                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "bkXNuL-UEzKs9-XrftD7",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 
                        Header={() => <Header sticky />}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            icon={<Logo/>}
                            text="PlotPilot"
                          />
                        )}
                        >  
                          <Outlet />
                        </ThemedLayoutV2>

                        
                      </Authenticated>
                    }
                  >
                     <Route index element={<Navigate to="/dashboard" />} />

                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/reviews" element={<ComingSoon/>} />
                    <Route path="/messages" element={<ComingSoon />} />
                    <Route path="my-profile" element={<MyProfile/>}/>

                    <Route path="properties">
                      <Route index element={<AllProperties/>} />
                      <Route path="show/:id" element={<PropertyDetails/>} />
                      <Route path="edit/:id" element={<EditProperty />} />
                      <Route path="create" element={<CreateProperty />} />
                    </Route>
                      <Route path="agents">
                        <Route index element={<Agents />} />
                        <Route path="show/:id" element={<AgentProfile />} />
                      </Route>
                    
                    
                    
                    <Route path="*" element={<ErrorComponent />} />
                 
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
      </ThemeProvider>

    </BrowserRouter>
  );
}

export default App;
