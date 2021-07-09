import unittest
import requests

from controller.temp import TempClass

class TempTestCase(unittest.TestCase):
    # comment to test tests
    def test_get_response(self):
        expected_result = {"data": "Hello World"}
        self.assertEqual(TempClass.HelloWorld(), expected_result)


if __name__ == "__main__":
    unittest.main()