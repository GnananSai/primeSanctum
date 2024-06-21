from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class User(BaseModel):
    id: str
    username: str
    password: str
    email: str
    avatar: Optional[str]
    createdAt: datetime      

class Register(BaseModel):
    username: str
    password: str
    email: str
    avatar: Optional[str]

class Login(BaseModel):
    username: str
    password: str                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

class Message(BaseModel):
    status: int
    message: str

class FlatList(BaseModel):
    id: str
    title: str
    img: str
    bedroom: int
    bathroom: int
    price: float
    address: str
    latitude: float
    longitude: float


