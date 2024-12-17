def sum_numbers(data):
    # Agar data int bo'lsa, uni qaytaradi
    if isinstance(data, int):
        return data
    # Agar data list bo'lsa, uning elementlarini rekursiv yig'adi
    elif isinstance(data, list):
        return sum(sum_numbers(item) for item in data)
    # Agar data dict bo'lsa, uning qiymatlarini rekursiv yig'adi
    elif isinstance(data, dict):
        return sum(sum_numbers(value) for value in data.values())
    # Qolgan hollarda 0 qaytaradi
    else:
        return 0

# JavaScript obyektining Python ko'rinishi
obj = {
    "afd": "123",
    "asdfjna": 123123,
    "kgr": "fsdfg",
    "dfasd": [None, 32, [4, 454, [None]], [234, None, 2], 343, [], [1, 3, 4]],
    "sdfdsd": "asdfas"
}

# Raqamlar yig'indisini topish
total_sum = sum_numbers(obj)

# Natijani chop etish
print(f"Obyektdagi barcha raqamlar yig'indisi: {total_sum}")


