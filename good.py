def print_combination(n: int, k: int):
    """In tất cả tổ hợp k phần tử của tập {1..n} bằng đệ quy."""

    a = [0] * (k + 1)  # mảng chứa tổ hợp hiện tại (1-indexed)

    def try_pos(i: int, start: int):
        # i: vị trí đang chọn (1..k)
        # start: giá trị nhỏ nhất có thể chọn ở vị trí i

        # ✅ Điều kiện dừng: đã chọn đủ k phần tử
        if i > k:
            print(*a[1:k + 1])
            return

        # ✅ Đệ quy: chọn giá trị cho a[i]
        # Không dùng for, mà đệ quy tăng start dần
        if start <= n - k + i:
            a[i] = start
            try_pos(i + 1, start + 1)  
            try_pos(i, start + 1)    

    try_pos(1, 1)


if __name__ == "__main__":
    print_combination(4, 2)
