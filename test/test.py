import argparse
import requests
import json

SERVER_URL = "http://localhost:8080"
HEADERS = {'Content-Type': 'application/json'}


def main():
    parser = argparse.ArgumentParser("Script to test the API ")
    parser.add_argument("test", type=str, default="all", help="Which test to run")
    args = parser.parse_args()


    with open("test_data.json", "r") as file:
        data = json.load(file)

    match args.test:
        case "all":
            run_all_tests(data)
        case "register":
            test_register_user(data)
        case "login":
            test_login_user(data)


def run_all_tests(data):
    test_register_user(data)
    test_login_user(data)


def test_register_user(data):
    response = requests.post(f"{SERVER_URL}/register",
                              json=data["user"], 
                              headers=HEADERS)
    print(response.content)
    wipe_database()


def test_login_user(data):
    pass


# for use after adding test data to db
def wipe_database():
    pass


if __name__ == "__main__":
    main()
