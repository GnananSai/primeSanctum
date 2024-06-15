from fastapi import FastAPI, HTTPException, status, Response, Cookie, Depends
from typing import List
from config.database import *
from model.models import *
from config.jwt import create_access_token
import bcrypt
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from datetime import datetime, timedelta, timezone

app = FastAPI()

origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = ["*"],
    allow_headers = ["*"],
    allow_methods = ["*"]
)

@app.exception_handler(HTTPException)
def exception_handling(request, exc):
    print(exc.status_code, exc.detail)
    return JSONResponse(status_code=exc.status_code, content=exc.detail)


# Generating hash for user entered password to save in db
def hash_pwd(pwd):
    bytes = pwd.encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    return hash

# Matching entered password with the hashed password in database
def match_pwd(pwd, hash):
    userbytes = pwd.encode('utf-8')
    return bcrypt.checkpw(userbytes, hash)


# Register Request
@app.post("/register", response_model=Message)
def register(user: Register, response: Response):
    try:

        user = user.dict()
        user['createdAt'] = datetime.now()
        user["password"] = hash_pwd(user["password"])

        if get_user(user['username']):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=Message(status=0, message="User already exists").dict())
        
        res = add_user(user)

        if res:
            response.status_code = status.HTTP_201_CREATED
            return Message(status=1, message="User registered successfully")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=Message(status=0, message="Something went wrong").dict())

    except HTTPException as e:
        raise e

    except Exception as e:
        message = f"Something went wrong {e}"
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail= Message(status=0, message=message).dict()
            )

# Login
@app.post("/login", response_model=Message)
def login(login_user: Login, response: Response):

    try: 
        username = login_user.dict()['username']
        password = login_user.dict()['password']
        user = get_user(username)

        if user and match_pwd(password, user['password']):
            
            print("Authenticated")
            access_token = create_access_token(
                data={"username": username}
            )

            response.set_cookie(key="access_token", value=access_token, httponly=True, expires=datetime.now(timezone.utc) + timedelta(minutes=30))
            response.status_code = status.HTTP_200_OK
            return Message(status=1, message="Logged in successfully")

        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail= Message(status=0, message="Invalid credentials").dict()
            )
    
    except HTTPException as e:
        raise e

    except Exception as e:
        message = f"Something went wrong {e}"
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail= Message(status=0, message=message).dict()
            )

# Logout
@app.post("/logout", response_model=Message)
def logout(response: Response):
    response.delete_cookie(key="access_token")
    return Message(status=1, message="Logged out successfully")

@app.get("/api/flats-list")
def list_flats():
    try:
        flats = get_flats_list()
        return {
            "status": "1",
            "data": flats
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        message = f"Something went wrong {e}"
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=Message(status=0, message=message).dict()
        )
    
@app.post("/api/add-flat", response_model=Message)
def add_flat(flat: FlatList, response: Response):
    try:
        flat = flat.dict()
        res = add_flat_db(flat)

        if res:
            response.status_code = status.HTTP_201_CREATED
            return Message(status=1, message="Apartment added successfully")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=Message(status=0, message="Something went wrong").dict())

    except HTTPException as e:
        raise e
    except Exception as e:
        message = f"Something went wrong {e}"
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=Message(status=0, message=message).dict()
        )
    

@app.get("/api/flat/{id}")
def get_flat(id: int, response: Response):
    print(id)
    try:
        flat = get_flat_by_id(id)
        if flat:
            return {
                "status": "1",
                "data": flat
            }
    except HTTPException as e:
        raise e
    except Exception as e:
        message = f"Something went wrong {e}"
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=Message(status=0, message=message).dict()
        )

def get_session_token(access_token: Optional[str] = Cookie(None)):
    print(access_token)
    if access_token:
        return access_token
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorised")

@app.get('/protected/message')
def get_message(access_token: str = Depends(get_session_token)):
    return {"Message": "Authenticated"}
