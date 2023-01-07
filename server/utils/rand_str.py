import string    
import random


S = 16

def rand_str() -> str:
    ran = ''.join(random.choices(string.ascii_lowercase + string.digits, k = S))    
    return str(ran)