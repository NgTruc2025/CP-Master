import { Stage, Tip, ResourceLink } from './types';

export const ROADMAP_DATA: Stage[] = [
  {
    id: 1,
    title: "Giai đoạn 1: Nền tảng",
    duration: "Tuần 1 - 6",
    description: "Xây dựng tư duy lập trình, làm quen ngôn ngữ C++ và các cấu trúc dữ liệu cơ bản.",
    categories: [
      {
        title: "Tuần 1: Nhập môn & Ngôn ngữ lập trình",
        items: [
          { 
            id: "s1_w1_knowledge", 
            name: "Kiến thức nền tảng C++", 
            description: "Cài đặt môi trường, Cú pháp cơ bản, Nhập xuất nhanh.",
            details: "Trong lập trình thi đấu, tốc độ thực thi là quan trọng nhất. C++ được ưa chuộng nhờ STL và hiệu năng cao. Bạn cần thuộc lòng template nhập xuất nhanh (Fast I/O) để không bị Time Limit Exceeded (TLE) ở các bài có input lớn.",
            codeSnippet: `#include <bits/stdc++.h>
using namespace std;

// Template cơ bản cho mọi bài thi đấu
int main() {
    // Tắt đồng bộ I/O để cin/cout nhanh bằng scanf/printf
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long a, b;
    cin >> a >> b;
    cout << (a + b) << "\\n"; // Luôn dùng \\n thay vì endl để flush buffer nhanh hơn
    return 0;
}`
          },
          { 
            id: "s1_w1_ex1", 
            name: "Bài tập: A + B Problem",
            description: "Làm quen với hệ thống chấm bài (OJ).",
            details: "Đây là bài toán 'Hello World' của dân CP. Mục tiêu là kiểm tra xem bạn đã biết cách nhập dữ liệu từ luồng chuẩn (stdin) và in ra luồng chuẩn (stdout) hay chưa. Chú ý kiểu dữ liệu: nếu tổng vượt quá 2 tỷ, phải dùng long long.",
            codeSnippet: `int a, b;
cin >> a >> b;
cout << a + b;`,
            links: [
                { title: "VNOI: A+B", url: "https://oj.vnoi.info/problem/pbinput0" },
                { title: "CSES: Weird Algorithm", url: "https://cses.fi/problemset/task/1068" }
            ] 
          },
          { 
            id: "s1_w1_ex2", 
            name: "Bài tập: Vòng lặp & Điều kiện", 
            description: "Xử lý logic cơ bản.",
            details: "Rèn luyện tư duy chuyển đổi từ đề bài sang code. Bạn cần thành thạo for, while, if/else. Lưu ý các lỗi thường gặp: lặp vô hạn, sai điều kiện biên (off-by-one error).",
            codeSnippet: `// Tính tổng các số từ 1 đến N
long long n;
cin >> n;
long long sum = 0;
for(int i = 1; i <= n; i++) {
    sum += i;
}
cout << sum;`,
            links: [{ title: "Codeforces: Watermelon", url: "https://codeforces.com/problemset/problem/4/A" }] 
          }
        ]
      },
      {
        title: "Tuần 2: Cấu trúc dữ liệu cơ bản",
        items: [
          { 
            id: "s1_w2_knowledge", 
            name: "STL C++: Vector, Stack, Queue", 
            description: "Làm chủ thư viện chuẩn.",
            details: "STL (Standard Template Library) là vũ khí mạnh nhất của C++. Vector thay thế mảng tĩnh, Stack (LIFO) dùng cho đệ quy/ngoặc, Queue (FIFO) dùng cho BFS.",
            codeSnippet: `#include <vector>
#include <stack>
#include <queue>
using namespace std;

void stl_demo() {
    vector<int> v = {1, 2, 3};
    v.push_back(4); // O(1)
    
    stack<int> s; 
    s.push(1); // Thêm vào đỉnh
    s.pop();   // Lấy ra từ đỉnh
    
    queue<int> q;
    q.push(1); // Thêm vào cuối
    q.pop();   // Lấy ra từ đầu
}`
          },
          { 
            id: "s1_w2_ex1", 
            name: "Bài tập: Dãy ngoặc đúng",
            description: "Ứng dụng kinh điển của Stack.",
            details: "Một dãy ngoặc đúng (balanced) nếu mỗi ngoặc mở có một ngoặc đóng tương ứng theo đúng thứ tự. Dùng Stack: gặp '(' thì push, gặp ')' thì pop và kiểm tra.",
            codeSnippet: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(c);
        else {
            if (st.empty()) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
            links: [
                { title: "VNOI: Ngoặc đúng", url: "https://oj.vnoi.info/problem/kmincb001" },
                { title: "CSES: Stick Lengths (Sort)", url: "https://cses.fi/problemset/task/1074" }
            ] 
          },
          { 
            id: "s1_w2_ex2", 
            name: "Bài tập: Hàng đợi (Queue)", 
            description: "Mô phỏng quy trình xếp hàng.",
            details: "Queue thường dùng trong bài toán mô phỏng hoặc BFS. Trong C++, std::queue mặc định dùng deque làm container bên dưới.",
            codeSnippet: `queue<int> q;
q.push(10);
q.push(20);
cout << q.front(); // 10
q.pop();
cout << q.front(); // 20`,
            links: [{ title: "CSES: Josephus Problem", url: "https://cses.fi/problemset/task/2162" }] 
          }
        ]
      },
      {
        title: "Tuần 3: Tìm kiếm & Sắp xếp",
        items: [
          { 
            id: "s1_w3_knowledge", 
            name: "Binary Search (Tìm kiếm nhị phân)", 
            description: "Tìm kiếm trong O(log N).",
            details: "Không chỉ tìm phần tử trong mảng, Binary Search còn dùng để 'tìm kiếm kết quả' (Binary Search on Answer) nếu hàm kiểm tra kết quả check(x) có tính đơn điệu (FFFFTTTT).",
            codeSnippet: `// Tìm số đầu tiên >= x trong mảng a đã sort
// Tương đương hàm lower_bound(a.begin(), a.end(), x)
int k = 0;
for (int b = n/2; b >= 1; b /= 2) {
    while (k+b < n && a[k+b] < x) k += b;
}
if (a[k] < x) k++; // k là vị trí cần tìm`
          },
          { 
            id: "s1_w3_ex1", 
            name: "Bài tập: Sắp xếp & Tọa độ", 
            description: "Sử dụng sort và struct.",
            details: "Sắp xếp là bước tiền xử lý quan trọng. Trong C++, hàm sort() chạy Introsort (kết hợp QuickSort, HeapSort, InsertionSort) với độ phức tạp trung bình O(N log N).",
            codeSnippet: `struct Point { int x, y; };
bool cmp(Point a, Point b) {
    if (a.x != b.x) return a.x < b.x;
    return a.y < b.y;
}
// Trong main: sort(points.begin(), points.end(), cmp);`,
            links: [
                { title: "CSES: Distinct Numbers", url: "https://cses.fi/problemset/task/1621" },
                { title: "VNOI: Sắp xếp", url: "https://oj.vnoi.info/problem/nksort" }
            ] 
          },
          { 
            id: "s1_w3_ex2", 
            name: "Bài tập: Chặt nhị phân kết quả", 
            description: "Kỹ thuật nâng cao của Binary Search.",
            details: "Khi đề bài hỏi 'giá trị lớn nhất có thể thỏa mãn điều kiện X' hoặc 'giá trị nhỏ nhất...', hãy nghĩ ngay đến chặt nhị phân trên tập kết quả.",
            codeSnippet: `// Hàm check xem với giá trị mid có thỏa mãn không
bool check(long long mid) { ... }

long long l = 0, r = 1e18, ans = -1;
while (l <= r) {
    long long mid = l + (r - l) / 2;
    if (check(mid)) {
        ans = mid;
        l = mid + 1; // Tìm max thì tăng l
    } else {
        r = mid - 1;
    }
}`,
            links: [{ title: "VNOI: Chặt gỗ (EKO)", url: "https://oj.vnoi.info/problem/vmunch" }] 
          }
        ]
      },
      {
        title: "Tuần 4: Đệ quy & Backtracking",
        items: [
          { 
            id: "s1_w4_knowledge", 
            name: "Quay lui (Backtracking)", 
            description: "Sinh hoán vị, tổ hợp, chỉnh hợp.",
            details: "Tư duy: Xây dựng nghiệm từng phần. Tại bước k, thử tất cả khả năng khả dĩ. Nếu khả năng đó hợp lệ, ghi nhận và đệ quy sang bước k+1. Sau khi đệ quy về, phải hoàn tác trạng thái (backtrack) để thử khả năng khác.",
            codeSnippet: `// Sinh tập con (Subset generation)
void search(int k) {
    if (k == n + 1) {
        // Xử lý tập con
        return;
    }
    // Không chọn phần tử k
    search(k + 1);
    // Có chọn phần tử k
    subset.push_back(k);
    search(k + 1);
    subset.pop_back(); // Backtrack
}`
          },
          { 
            id: "s1_w4_ex1", 
            name: "Bài tập: N Queen Problem", 
            description: "Bài toán xếp hậu kinh điển.",
            details: "Đặt N quân hậu lên bàn cờ NxN sao cho không quân nào ăn nhau. Dùng mảng đánh dấu cột, đường chéo xuôi, đường chéo ngược để kiểm tra O(1).",
            codeSnippet: `void try_queen(int i) {
    for (int j = 1; j <= n; j++) {
        if (!col[j] && !diag1[i+j] && !diag2[i-j+n]) {
            col[j] = diag1[i+j] = diag2[i-j+n] = true;
            if (i == n) cnt++;
            else try_queen(i + 1);
            col[j] = diag1[i+j] = diag2[i-j+n] = false;
        }
    }
}`,
            links: [{ title: "CSES: Chessboard and Queens", url: "https://cses.fi/problemset/task/1624" }] 
          },
          { 
            id: "s1_w4_ex2", 
            name: "Bài tập: Sinh tổ hợp", 
            description: "Liệt kê các cách chọn K phần tử từ N.",
            details: "Sinh tổ hợp chập K của N phần tử. Có thể dùng std::next_permutation trên mảng gồm K số 1 và N-K số 0 để sinh nhanh.",
            links: [{ title: "CSES: Creating Strings", url: "https://cses.fi/problemset/task/1622" }] 
          }
        ]
      },
      {
        title: "Tuần 5: Toán học cơ bản",
        items: [
          { 
            id: "s1_w5_knowledge", 
            name: "Số học: Nguyên tố & GCD", 
            description: "Các định lý toán học cơ bản.",
            details: "Hiểu sâu về Sàng Eratosthenes (O(N log log N)), Phân tích thừa số nguyên tố (Prime Factorization), và thuật toán Euclid tìm GCD.",
            codeSnippet: `// Phân tích thừa số nguyên tố O(sqrt N)
vector<int> factors;
for (int i = 2; i * i <= n; i++) {
    while (n % i == 0) {
        factors.push_back(i);
        n /= i;
    }
}
if (n > 1) factors.push_back(n);`
          },
          { 
            id: "s1_w5_ex1", 
            name: "Bài tập: Đếm ước", 
            description: "Áp dụng phân tích thừa số.",
            details: "Số lượng ước của n = p1^a1 * p2^a2... là (a1+1)(a2+1)...",
            links: [{ title: "CSES: Counting Divisors", url: "https://cses.fi/problemset/task/1713" }] 
          },
          { 
            id: "s1_w5_ex2", 
            name: "Bài tập: Exponentiation (Lũy thừa nhanh)", 
            description: "Tính a^b % m trong O(log b).",
            details: "Thay vì nhân b lần, ta dùng công thức đệ quy: a^b = (a^(b/2))^2. Nếu b lẻ thì nhân thêm a.",
            codeSnippet: `long long binpow(long long a, long long b, long long m) {
    long long res = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}`,
            links: [{ title: "CSES: Exponentiation", url: "https://cses.fi/problemset/task/1095" }] 
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Giai đoạn 2: Cơ bản nâng cao",
    duration: "Tuần 7 - 14",
    description: "Nắm vững các thuật toán cốt lõi: Đồ thị, QHĐ và Toán học nâng cao.",
    categories: [
      {
        title: "Tuần 7–8: DFS & BFS",
        items: [
          { 
            id: "s2_w7_knowledge", 
            name: "Lý thuyết Đồ thị (DFS/BFS)", 
            description: "Biểu diễn đồ thị và duyệt.",
            details: "Đồ thị thường được biểu diễn bằng Danh sách kề (Adjacency List) `vector<int> adj[N]`. DFS dùng Stack (hoặc đệ quy), BFS dùng Queue.",
            codeSnippet: `// DFS đếm số thành phần liên thông
void dfs(int s) {
    if (visited[s]) return;
    visited[s] = true;
    for (auto u : adj[s]) {
        dfs(u);
    }
}
// Trong main:
// for (int i = 1; i <= n; i++) 
//   if (!visited[i]) { count++; dfs(i); }`
          },
          { 
            id: "s2_w7_ex1", 
            name: "Bài tập: Đếm phòng (Counting Rooms)", 
            description: "Bài toán Loang (Flood fill) trên lưới.",
            details: "Đồ thị dạng lưới 2D. Mỗi ô (i, j) là một đỉnh, kề với 4 ô xung quanh. Dùng DFS/BFS để đánh dấu các ô cùng một phòng.",
            links: [{ title: "CSES: Counting Rooms", url: "https://cses.fi/problemset/task/1192" }] 
          },
          { 
            id: "s2_w7_ex2", 
            name: "Bài tập: Tìm đường trong mê cung", 
            description: "BFS tìm đường ngắn nhất.",
            details: "Trên đồ thị không trọng số, BFS luôn tìm ra đường đi ngắn nhất (ít cạnh nhất). Cần mảng trace[u] để truy vết đường đi.",
            links: [{ title: "CSES: Labyrinth", url: "https://cses.fi/problemset/task/1193" }] 
          }
        ]
      },
      {
        title: "Tuần 9–10: Dynamic Programming (QHĐ)",
        items: [
          { 
            id: "s2_w9_knowledge", 
            name: "Nhập môn Quy hoạch động", 
            description: "Tư duy chia để trị + Lưu bảng phương án.",
            details: "Key của DP là 'overlapping subproblems' (bài toán con gối nhau). Hãy bắt đầu với: Gọi dp[i] là gì? Để tính dp[i] cần các giá trị nào trước đó? Cơ sở quy hoạch (Base case) là gì?",
            codeSnippet: `// Bài toán cái túi (Knapsack) O(N*W)
// dp[w] = giá trị lớn nhất với trọng lượng w
for (int i = 0; i < n; i++) { // Duyệt từng đồ vật
    for (int w = W; w >= weight[i]; w--) {
        dp[w] = max(dp[w], dp[w - weight[i]] + value[i]);
    }
}`
          },
          { 
            id: "s2_w9_ex1", 
            name: "Bài tập: Dice Combinations", 
            description: "Đếm số cách tạo tổng N.",
            details: "Gọi dp[i] là số cách tạo ra tổng i bằng cách gieo xúc xắc. dp[i] = sum(dp[i - k]) với k từ 1..6.",
            links: [{ title: "CSES: Dice Combinations", url: "https://cses.fi/problemset/task/1633" }] 
          },
          { 
            id: "s2_w9_ex2", 
            name: "Bài tập: Dãy con tăng dài nhất (LIS)", 
            description: "Kỹ thuật DP cổ điển.",
            details: "dp[i] là độ dài LIS kết thúc tại i. Công thức: dp[i] = max(dp[j]) + 1 với j < i và a[j] < a[i]. Có thể tối ưu lên O(N log N) bằng tìm kiếm nhị phân.",
            links: [{ title: "CSES: Increasing Subsequence", url: "https://cses.fi/problemset/task/1145" }] 
          },
          { 
            id: "s2_w9_ex3", 
            name: "Bài tập: Minimizing Coins", 
            description: "Bài toán đổi tiền.",
            details: "Tìm số lượng đồng xu ít nhất để tạo thành tổng X. dp[x] = min(dp[x - coin]) + 1.",
            links: [{ title: "CSES: Minimizing Coins", url: "https://cses.fi/problemset/task/1634" }] 
          }
        ]
      },
      {
        title: "Tuần 11–12: Cấu trúc dữ liệu nâng cao",
        items: [
          { 
            id: "s2_w11_knowledge", 
            name: "Map & Set (BST)", 
            description: "Quản lý tập hợp động.",
            details: "Khi cần lưu trữ dữ liệu rời rạc, hoặc key là chuỗi/số lớn, hãy dùng Map. Set giúp loại bỏ trùng lặp và tìm kiếm nhanh. Lưu ý: unordered_map nhanh hơn (O(1)) nhưng dễ bị hack hash collision trong thi đấu, map an toàn hơn (O(logN)).",
            codeSnippet: `set<int> s;
s.insert(3);
s.insert(1);
s.insert(3); // Không tác dụng
cout << s.size(); // 2
for (auto x : s) cout << x << " "; // 1 3 (tự động sort)`
          },
          { 
            id: "s2_w11_ex1", 
            name: "Bài tập: Distinct Numbers", 
            description: "Đếm số phần tử khác nhau.",
            details: "Sử dụng std::set để insert và đếm size, hoặc sort rồi đếm.",
            links: [{ title: "CSES: Distinct Numbers", url: "https://cses.fi/problemset/task/1621" }] 
          },
          { 
            id: "s2_w11_ex2", 
            name: "Bài tập: Concert Tickets", 
            description: "Sử dụng multiset và upper_bound.",
            details: "Cần tìm giá vé lớn nhất <= mức giá khách hàng trả. Dùng multiset (vì giá vé có thể trùng) và hàm upper_bound (hoặc lower_bound).",
            links: [{ title: "CSES: Concert Tickets", url: "https://cses.fi/problemset/task/1091" }] 
          }
        ]
      },
      {
        title: "Tuần 13–14: Toán học nâng cao",
        items: [
          { 
            id: "s2_w13_knowledge", 
            name: "Tổ hợp & Modular Inverse", 
            description: "Tính C(n,k) modulo P.",
            details: "Khi P = 1e9+7 (nguyên tố), để chia cho A modulo P, ta nhân với nghịch đảo modulo A^(P-2). Cần tiền xử lý giai thừa (Factorial) để tính nCk trong O(1).",
            codeSnippet: `long long fact[N], invFact[N];
long long nCk(int n, int k) {
    if (k > n) return 0;
    return fact[n] * invFact[k] % P * invFact[n-k] % P;
}`
          },
          { 
            id: "s2_w13_ex1", 
            name: "Bài tập: Binomial Coefficients", 
            description: "Tính tổ hợp với nhiều truy vấn.",
            details: "Yêu cầu tính Q truy vấn nCk % (1e9+7). Bắt buộc phải precompute giai thừa.",
            links: [{ title: "CSES: Binomial Coefficients", url: "https://cses.fi/problemset/task/1079" }] 
          },
          { 
            id: "s2_w13_ex2", 
            name: "Bài tập: Creating Strings II", 
            description: "Đếm số hoán vị lặp.",
            details: "Số cách sắp xếp chuỗi có ký tự trùng lặp = N! / (n1! * n2! * ...). Áp dụng nghịch đảo modulo.",
            links: [{ title: "CSES: Creating Strings II", url: "https://cses.fi/problemset/task/1715" }] 
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Giai đoạn 3: Nâng cao",
    duration: "Tuần 17 - 22",
    description: "Chinh phục các kỹ thuật khó: Segment Tree, Đồ thị nâng cao và DP nâng cao.",
    categories: [
      {
        title: "Tuần 17–18: Range Queries",
        items: [
          { 
            id: "s3_w17_knowledge", 
            name: "Segment Tree (Cây phân đoạn)", 
            description: "Truy vấn và cập nhật trên đoạn.",
            details: "Segment Tree chia mảng thành các đoạn [L, R]. Nút cha quản lý hợp của hai con. Cho phép Update phần tử (hoặc đoạn) và Query tổng/min/max/gcd trên đoạn [u, v] đều trong O(log N).",
            codeSnippet: `void build(int id, int l, int r) {
    if (l == r) { t[id] = a[l]; return; }
    int mid = (l + r) / 2;
    build(id*2, l, mid);
    build(id*2+1, mid+1, r);
    t[id] = t[id*2] + t[id*2+1]; // Query Sum
}`
          },
          { 
            id: "s3_w17_ex1", 
            name: "Bài tập: Range Sum Queries", 
            description: "Tính tổng đoạn + Update điểm.",
            details: "Bài toán cơ bản nhất của Segment Tree hoặc Fenwick Tree (Binary Indexed Tree).",
            links: [{ title: "CSES: Dynamic Range Sum", url: "https://cses.fi/problemset/task/1648" }] 
          },
          { 
            id: "s3_w17_ex2", 
            name: "Bài tập: Range Update Queries", 
            description: "Lazy Propagation (Cập nhật lười).",
            details: "Khi update cả đoạn [l, r], ta không update hết các nút con ngay mà dùng biến 'lazy' để đánh dấu. Chỉ đẩy (push) lazy xuống con khi cần thiết.",
            links: [{ title: "CSES: Range Update Queries", url: "https://cses.fi/problemset/task/1651" }] 
          }
        ]
      },
      {
        title: "Tuần 19–20: Đồ thị nâng cao",
        items: [
          { 
            id: "s3_w19_knowledge", 
            name: "Shortest Path (Dijkstra, Floyd)", 
            description: "Đường đi ngắn nhất có trọng số.",
            details: "Dijkstra dùng Priority Queue (O(E log V)) cho đồ thị trọng số không âm. Bellman-Ford/SPFA xử lý trọng số âm. Floyd-Warshall (O(V^3)) tìm đường đi giữa mọi cặp đỉnh.",
            codeSnippet: `// Dijkstra
priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
dist[s] = 0; pq.push({0, s});
while (!pq.empty()) {
    long long d = pq.top().first;
    int u = pq.top().second; pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}`
          },
          { 
            id: "s3_w19_ex1", 
            name: "Bài tập: Shortest Routes I", 
            description: "Dijkstra cơ bản.",
            details: "Tìm đường đi ngắn nhất từ đỉnh 1 đến các đỉnh còn lại.",
            links: [{ title: "CSES: Shortest Routes I", url: "https://cses.fi/problemset/task/1671" }] 
          },
          { 
            id: "s3_w19_ex2", 
            name: "Bài tập: Shortest Routes II", 
            description: "Floyd-Warshall.",
            details: "Cho ma trận trọng số, trả lời nhanh khoảng cách giữa 2 đỉnh bất kỳ. N <= 500.",
            links: [{ title: "CSES: Shortest Routes II", url: "https://cses.fi/problemset/task/1672" }] 
          }
        ]
      },
      {
        title: "Tuần 21–22: DP nâng cao",
        items: [
          { 
            id: "s3_w21_knowledge", 
            name: "Bitmask DP & Tree DP", 
            description: "DP trên tập hợp và cây.",
            details: "Bitmask: Biểu diễn trạng thái 'đã thăm/chưa thăm' bằng bit của số nguyên (N <= 20). Tree DP: Tính toán từ lá lên gốc (hoặc ngược lại) để giải quyết các bài toán như Đường kính cây, Tập độc lập lớn nhất.",
            codeSnippet: `// Hamiltonian Path (Bitmask DP)
// dp[mask][i]: có thể đi qua tập đỉnh mask và kết thúc ở i không?
if ((mask >> i) & 1) {
    int prev_mask = mask ^ (1 << i);
    for (int j = 0; j < n; j++) {
        if ((prev_mask >> j) & 1 && adj[j][i]) {
            dp[mask][i] += dp[prev_mask][j];
        }
    }
}`
          },
          { 
            id: "s3_w21_ex1", 
            name: "Bài tập: Hamiltonian Flights", 
            description: "Đếm đường đi qua tất cả thành phố.",
            details: "Sử dụng Bitmask DP. Trạng thái dp[mask][last_city].",
            links: [{ title: "CSES: Hamiltonian Flights", url: "https://cses.fi/problemset/task/1690" }] 
          },
          { 
            id: "s3_w21_ex2", 
            name: "Bài tập: Tree Diameter", 
            description: "Đường kính của cây.",
            details: "Đường kính là khoảng cách xa nhất giữa 2 nút bất kỳ. Cách giải: DP tại mỗi nút lưu 2 nhánh dài nhất đi xuống con, hoặc dùng 2 lần DFS.",
            links: [{ title: "CSES: Tree Diameter", url: "https://cses.fi/problemset/task/1131" }] 
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Giai đoạn 4: Thành thạo",
    duration: "Tuần 27+",
    description: "Đạt đẳng cấp chuyên sâu và tham khảo tài liệu chuẩn quốc tế.",
    categories: [
      {
        title: "Tuần 27+: Chuyên đề nâng cao",
        items: [
          { 
            id: "s4_w27_knowledge", 
            name: "Các thuật toán High-level", 
            description: "FFT, Geometry, String Algorithms.",
            details: "Để đạt trình độ Master/Grandmaster, cần biết: FFT (nhân đa thức), Convex Hull (bao lồi), KMP/Z-algo (xử lý chuỗi), Heavy-Light Decomposition (HLD - phân rã cây).",
            codeSnippet: `// Cross Product (Tích có hướng) kiểm tra vị trí điểm
long long cross_product(Point a, Point b, Point c) {
    return (b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x);
}
// > 0: rẽ trái (CCW), < 0: rẽ phải (CW), = 0: thẳng hàng`
          },
          { 
            id: "s4_w27_res1", 
            name: "Tài liệu: CSES Handbook", 
            description: "Sách giáo khoa huyền thoại.",
            details: "Cuốn sách Competitive Programmer's Handbook của Antti Laaksonen là tài liệu 'gối đầu giường' cô đọng và dễ hiểu nhất.",
            links: [{ title: "Download PDF", url: "https://cses.fi/book/book.pdf" }] 
          },
          { 
            id: "s4_w27_res2", 
            name: "Khóa học: CP-Algorithms", 
            description: "Bách khoa toàn thư thuật toán.",
            details: "Trang web cp-algorithms.com (bản dịch E-Maxx) chứa lời giải chi tiết cho hầu hết mọi thuật toán.",
            links: [{ title: "Visit Website", url: "https://cp-algorithms.com/" }] 
          }
        ]
      }
    ]
  }
];

export const IMPORTANT_TIPS: Tip[] = [
  {
    title: "Lịch trình học tập",
    content: "Mỗi chủ đề nên học trong 1–2 tuần. Cố gắng làm ít nhất 5–10 bài tập cho mỗi chủ đề để thấm nhuần kiến thức.",
    icon: "Clock"
  },
  {
    title: "Phương pháp học sâu",
    content: "Luôn viết lại thuật toán bằng lời để hiểu bản chất, sau đó tự code lại từ đầu (không copy paste).",
    icon: "Edit3"
  },
  {
    title: "Ghi chép (Logbook)",
    content: "Chuẩn bị sổ tay để ghi chú lại các lỗi sai thường gặp và các thuật toán mới học được.",
    icon: "BookOpen"
  },
  {
    title: "Feynman Technique",
    content: "Giải thích lại thuật toán cho người khác (hoặc viết blog) giúp bạn nhớ lâu hơn và hiểu sâu hơn.",
    icon: "MessageSquare"
  }
];

export const RESOURCES: ResourceLink[] = [
  { name: "Codeforces", url: "https://codeforces.com/", description: "Nền tảng thi đấu lớn nhất thế giới.", category: "Judge" },
  { name: "VNOI", url: "https://oj.vnoi.info/", description: "Cộng đồng và hệ thống chấm bài của Việt Nam.", category: "Judge" },
  { name: "CSES Problem Set", url: "https://cses.fi/problemset/", description: "Bộ bài tập chuẩn để luyện kỹ thuật chuẩn.", category: "Judge" },
  { name: "AtCoder", url: "https://atcoder.jp/", description: "Đề bài chất lượng cao, thiên về tư duy toán.", category: "Judge" },
  { name: "CP Algorithms", url: "https://cp-algorithms.com/", description: "Wikipedia của dân thuật toán.", category: "Book" },
  { name: "VNOI Wiki", url: "https://vnoi.info/wiki/Home", description: "Kho kiến thức thuật toán tiếng Việt chất lượng.", category: "Book" },
];