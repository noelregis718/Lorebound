from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from google.oauth2 import id_token
from google.auth.transport import requests
import os

# ================= CONFIG =================

SECRET_KEY = os.getenv("SECRET_KEY", "CHANGE_THIS_IN_PROD")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

if not GOOGLE_CLIENT_ID:
    raise RuntimeError("GOOGLE_CLIENT_ID is not set in environment variables")

# ================= STATE =================

# In-memory user store (replace with DB later)
users = {}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ================= JWT =================

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {**data, "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ================= GOOGLE AUTH =================

def verify_google_token(token: str):
    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )
        return {
            "email": idinfo["email"],
            "name": idinfo.get("name"),
            "picture": idinfo.get("picture"),
        }
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Google token")

def get_or_create_user(google_user):
    email = google_user["email"]
    if email not in users:
        users[email] = {
            "email": email,
            "name": google_user["name"],
            "picture": google_user["picture"],
        }
    return users[email]

# ================= DEPENDENCY =================

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")

        if not email or email not in users:
            raise HTTPException(status_code=401, detail="Invalid token")

        return users[email]

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
