from pymongo import MongoClient
from model.models import User

client = MongoClient("mongodb+srv://divyatejapendyala:VeMCm6gx5RmmAE0h@cluster0.do32egz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client.primesanctum

collection_users = db["users"]

collection_flats = db["flats"]

def get_user(username):
    user = collection_users.find_one({"username":username})
    return user

def add_user(user):
    user = collection_users.insert_one(user)
    return user

def get_flats_list():
    items = []
    for item in collection_flats.find():
        item.pop("_id")
        items.append(item)
    return items

def add_flat_db(flat):
    flat = collection_flats.insert_one(flat)
    return flat

def get_flat_by_id(id):
    flat = collection_flats.find_one({"id": id})
    # del flat["_id"]
    flat["_id"] = str(flat["_id"])
    return flat
    