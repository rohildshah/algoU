class TrackedList(list):
    def __init__(self, data):
        list.__init__(self, data)
        self.swaps = []

    def swap(self, i, j):
        self.swaps.append((i, j))

        tmp = list.__getitem__(self, i)
        list.__setitem__(self, i, list.__getitem__(self, j))
        list.__setitem__(self, j, tmp)

        return list