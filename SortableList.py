class SortableList():
    def __init__(self, data):
        self.swaps = []
        self.data = data


    def swap(self, i1, i2):
        self.swaps.append((i1, i2))

        tmp = self.data[i1]
        self.data[i1] = self.data[i2]
        self.data[i2] = tmp