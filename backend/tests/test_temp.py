import unittest
import requests

class TempTestCase(unittest.TestCase):
    def test_get_response(self):
        response = requests.get("http://127.0.0.1:5000/temp")
        expected_result = {"data": "Hello World"}
        self.assertEqual(response.json(), expected_result)


if __name__ == "__main__":
    unittest.main()