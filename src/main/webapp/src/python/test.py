#!/usr/bin/python
import requests
import csv
import json

baseUrl = "http://web-lb-1363649479.us-west-2.elb.amazonaws.com/cmad-blog-project-advance"

def authenticate_user( userName, password ):
    headers = { 'Content-Type': 'application/json' }
    url = "{0}/public/users/authenticateUser".format( baseUrl )
    data = {}
    data['userName'] = userName
    data['password'] = password

    res = requests.post( url, data=json.dumps(data), headers=headers )
    print("API authenticate_user response ", res.status_code)

    if (res.status_code == 200):
        return res.headers['authorization']
    else:
        return None

def create_user( userName, password, firstName, lastName, emailId ):
    headers = { 'Content-Type': 'application/json' }
    url = "{0}/public/users".format( baseUrl )
    data = {}
    data['userName'] = userName
    data['password'] = password
    data['firstName'] = firstName
    data['lastName'] = lastName
    data['emailId'] = emailId

    print( "URL    ", url )
    print( "Header ", headers )
    print( "Data   ", data )

    res = requests.post( url, data=json.dumps(data), headers=headers )
    print("API create_user response ", res.status_code)

    if (res.status_code == 200):
        return True
    else:
        return False

def create_blog( auth, title, blogContent, category, author ):
    headers = { 'Content-Type': 'application/json' }
    headers['authorization'] = auth
    url = "{0}/public/blogs".format( baseUrl )
    data = {}
    data['title'] = title
    data['blogContent'] = blogContent
    data['category'] = category
    data['author'] = author

    res = requests.post( url, data=json.dumps(data), headers=headers )
    print("API create_blog response ", res.status_code)

    if (res.status_code == 200):
        return True
    else:
        return False

def read_input_data(csv_path):
    with open(csv_path, "rb") as file_obj:
        reader = csv.reader(file_obj)
        for row in reader:
            if (row[0] == 'create_user'):
                create_user( row[1], row[2], row[3], row[4], row[5] )
            elif (row[0] == 'create_blog'):
                auth = authenticate_user( row[1], row[2] )
                if (auth != None):
                    create_blog( auth, row[3], row[4], row[5], row[1] )

read_input_data('blog.csv')
