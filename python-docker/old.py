def bubbleSort(arr):
    n = len(arr.data)
  
    for i in range(n-1):
        for j in range(0, n-i-1):
            if arr.data[j] > arr.data[j + 1]:
                arr.swap(j, j + 1)