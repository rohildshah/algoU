class SortableList():
    def __init__(self):
        self.swaps = []
        self.data = [1, 2, 3, 4, 5]


    def swap(self, i1, i2):
        self.swaps.append((i1, i2))

        tmp = self.data[i1]
        self.data[i1] = self.data[i2]
        self.data[i2] = tmp