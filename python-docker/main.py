from SortableList import SortableList
from my_code import bubbleSort

arr = SortableList([64, 34, 25, 12, 22, 11, 90])
bubbleSort(arr)

for i in range(len(arr.data)):
    print("% d," % arr.data[i])

print(arr.swaps)