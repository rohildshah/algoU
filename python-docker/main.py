from TrackedList import TrackedList
from user_code import sort

arr = TrackedList([64, 34, 25, 12, 22, 11, 90])
sort(arr)

for i in range(len(arr)):
    print("% d," % arr[i])

print(arr.swaps)