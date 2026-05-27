// ===== DATA =====
const T=[
  {id:'ft-20260526-024',nm:'智能客服训练-V1',desc:'基于 Qwen3-8B 的智能客服对话 LoRA 调优',model:'Qwen3-8B',method:'SFT',mode:'LoRA',st:'draft',cr:'王颖',tm:'2026-05-26 09:00',dur:'—',loss:null,progress:0,ep:3,lr:'1e-4',ds:'客服对话训练集',dv:'Version3',gpu:'A100 × 2',stTm:'—',edTm:'—',outNm:'',outDesc:'',saveCount:3,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260525-025',nm:'文档摘要生成-DPO',desc:'使用 DPO 方法优化文档摘要生成质量',model:'Qwen3-14B',method:'DPO',mode:'LoRA',st:'draft',cr:'张三',tm:'2026-05-25 14:30',dur:'—',loss:null,progress:0,ep:3,lr:'5e-5',ds:'代码偏好数据集',dv:'Version1',gpu:'A100 × 4',stTm:'—',edTm:'—',outNm:'',outDesc:'',saveCount:3,resType:'独立资源',resPool:'资源池 A',gpuModel:'A100',gpuC:4},

  {id:'ft-20260507-001',nm:'客服对话微调-V3',desc:'基于 Qwen3-8B 的客服对话数据调优',model:'Qwen3-8B',method:'SFT',mode:'LoRA',st:'completed',cr:'王颖',tm:'2026-05-07 09:30',dur:'2h 15m',loss:0.032,progress:100,ep:3,lr:'1e-4',ds:'客服对话训练集',dv:'Version3',gpu:'A100 × 2',stTm:'2026-05-07 09:30',edTm:'2026-05-07 11:45',outNm:'客服对话微调-V3',saveInt:200,expLim:5,resType:'独立资源',resPool:'资源池 A',gpuModel:'A100',gpuC:2},
  {id:'ft-20260506-002',nm:'代码生成优化-DPO',desc:'使用 DPO 方法优化代码生成质量',model:'DeepSeek-R1-7B',method:'DPO',mode:'全量参数',st:'running',cr:'张三',tm:'2026-05-06 14:20',dur:'—',loss:0.187,progress:68,ep:2,lr:'5e-5',ds:'代码偏好数据集',dv:'Version2',gpu:'A100 × 4',stTm:'2026-05-06 14:20',edTm:'—',outNm:'代码生成优化-DPO',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:4},
  {id:'ft-20260505-003',nm:'商品描述生成-V2',desc:'基于 Doubao-Pro 的商品描述 SFT 调优',model:'Doubao-Pro-32K',method:'SFT',mode:'LoRA',st:'running',cr:'李四',tm:'2026-05-05 10:00',dur:'—',loss:0.058,progress:45,ep:5,lr:'2e-4',ds:'商品描述SFT数据',dv:'Version1',gpu:'A100 × 1',stTm:'2026-05-05 10:00',edTm:'—',outNm:'商品描述生成-V2',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:1},
  {id:'ft-20260504-004',nm:'内部知识问答',desc:'基于 Qwen3-8B 的知识问答 SFT 全量调优',model:'Qwen3-8B',method:'SFT',mode:'全量参数',st:'failed',cr:'小明',tm:'2026-05-04 16:45',dur:'0h 38m',loss:null,progress:38,ep:3,lr:'1e-4',ds:'知识问答数据集',dv:'Version5',gpu:'A100 × 2',stTm:'2026-05-04 16:45',edTm:'—',outNm:'内部知识问答',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260503-005',nm:'评测指标理解',desc:'基于 DeepSeek-R1-7B 的指标解读调优',model:'DeepSeek-R1-7B',method:'SFT',mode:'LoRA',st:'completed',cr:'小华',tm:'2026-05-03 08:10',dur:'1h 45m',loss:0.045,progress:100,ep:3,lr:'1e-4',ds:'指标解读训练集',dv:'Version2',gpu:'A100 × 1',stTm:'2026-05-03 08:10',edTm:'2026-05-03 01:55',outNm:'评测指标理解',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:1},
  {id:'ft-20260502-006',nm:'广告文案偏好',desc:'使用 DPO 方法优化广告文案生成',model:'Doubao-Pro-32K',method:'DPO',mode:'LoRA',st:'terminated',cr:'王颖',tm:'2026-05-02 11:30',dur:'0h 52m',loss:0.312,progress:52,ep:2,lr:'5e-5',ds:'文案偏好数据',dv:'Version1',gpu:'A100 × 2',stTm:'2026-05-02 11:30',edTm:'—',outNm:'广告文案偏好',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260501-007',nm:'摘要生成调优',desc:'基于 Qwen3-8B 的摘要 SFT 全量调优',model:'Qwen3-8B',method:'SFT',mode:'全量参数',st:'pending',cr:'小红',tm:'2026-05-01 17:00',dur:'—',loss:null,progress:0,ep:3,lr:'1e-4',ds:'摘要SFT数据',dv:'Version4',gpu:'A100 × 2',stTm:'—',edTm:'—',outNm:'摘要生成调优',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260430-008',nm:'多轮对话优化-V2',desc:'基于 Qwen3-14B 的多轮对话 LoRA 调优',model:'Qwen3-14B',method:'SFT',mode:'LoRA',st:'completed',cr:'张三',tm:'2026-04-30 09:15',dur:'3h 20m',loss:0.041,progress:100,ep:4,lr:'1e-4',ds:'多轮对话数据集',dv:'Version2',gpu:'A100 × 2',stTm:'2026-04-30 09:15',edTm:'2026-04-30 04:35',outNm:'多轮对话优化-V2',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260429-009',nm:'安全对齐-DPO',desc:'使用 DPO 方法进行安全偏好对齐',model:'Qwen3-14B',method:'DPO',mode:'LoRA',st:'completed',cr:'小明',tm:'2026-04-29 14:00',dur:'2h 05m',loss:0.068,progress:100,ep:3,lr:'5e-5',ds:'安全偏好数据集',dv:'Version1',gpu:'A100 × 2',stTm:'2026-04-29 14:00',edTm:'2026-04-29 08:05',outNm:'安全对齐-DPO',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260428-010',nm:'数学推理微调',desc:'基于 DeepSeek-R1-7B 的数学推理全量调优',model:'DeepSeek-R1-7B',method:'SFT',mode:'全量参数',st:'failed',cr:'小华',tm:'2026-04-28 10:30',dur:'1h 12m',loss:null,progress:42,ep:5,lr:'5e-5',ds:'数学推理数据集',dv:'Version3',gpu:'A100 × 4',stTm:'2026-04-28 10:30',edTm:'—',outNm:'数学推理微调',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:4},
  {id:'ft-20260427-011',nm:'日志分析调优',desc:'基于 Doubao-Pro 的日志分析 LoRA 调优',model:'Doubao-Pro-32K',method:'SFT',mode:'LoRA',st:'running',cr:'李四',tm:'2026-04-27 08:45',dur:'—',loss:0.092,progress:82,ep:3,lr:'2e-4',ds:'日志分析SFT数据',dv:'Version1',gpu:'A100 × 1',stTm:'2026-04-27 08:45',edTm:'—',outNm:'日志分析调优',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:1},
  {id:'ft-20260426-012',nm:'合同审查微调-V4',desc:'基于 Qwen3-8B 的合同审查 LoRA 调优',model:'Qwen3-8B',method:'SFT',mode:'LoRA',st:'completed',cr:'王颖',tm:'2026-04-26 16:20',dur:'1h 50m',loss:0.037,progress:100,ep:3,lr:'1e-4',ds:'合同审查训练集',dv:'Version4',gpu:'A100 × 2',stTm:'2026-04-26 16:20',edTm:'2026-04-26 10:10',outNm:'合同审查微调-V4',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260425-013',nm:'代码审查偏好',desc:'使用 DPO 方法优化代码审查偏好',model:'DeepSeek-R1-32B',method:'DPO',mode:'LoRA',st:'terminated',cr:'小红',tm:'2026-04-25 11:00',dur:'0h 40m',loss:0.287,progress:65,ep:2,lr:'5e-5',ds:'代码审查偏好数据',dv:'Version1',gpu:'A100 × 4',stTm:'2026-04-25 11:00',edTm:'—',outNm:'代码审查偏好',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:4},
  {id:'ft-20260424-014',nm:'简历解析微调',desc:'基于 Doubao-Lite 的简历解析 LoRA 调优',model:'Doubao-Lite-4K',method:'SFT',mode:'LoRA',st:'completed',cr:'张三',tm:'2026-04-24 09:30',dur:'0h 55m',loss:0.062,progress:100,ep:3,lr:'2e-4',ds:'简历解析数据集',dv:'Version2',gpu:'A100 × 1',stTm:'2026-04-24 09:30',edTm:'2026-04-24 02:25',outNm:'简历解析微调',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:1},
  {id:'ft-20260423-015',nm:'邮件生成微调',desc:'基于 Qwen3-14B 的邮件生成 LoRA 调优',model:'Qwen3-14B',method:'SFT',mode:'LoRA',st:'pending',cr:'小明',tm:'2026-04-23 15:10',dur:'—',loss:null,progress:0,ep:3,lr:'1e-4',ds:'邮件生成训练集',dv:'Version1',gpu:'A100 × 2',stTm:'—',edTm:'—',outNm:'邮件生成微调',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260422-016',nm:'表格理解优化',desc:'基于 DeepSeek-R1-7B 的表格理解全量调优',model:'DeepSeek-R1-7B',method:'SFT',mode:'全量参数',st:'completed',cr:'小华',tm:'2026-04-22 10:00',dur:'4h 10m',loss:0.029,progress:100,ep:5,lr:'5e-5',ds:'表格理解数据集',dv:'Version3',gpu:'A100 × 4',stTm:'2026-04-22 10:00',edTm:'2026-04-22 06:10',outNm:'表格理解优化',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:4},
  {id:'ft-20260421-017',nm:'用户画像生成',desc:'基于 Doubao-Pro 的用户画像 LoRA 调优',model:'Doubao-Pro-32K',method:'SFT',mode:'LoRA',st:'failed',cr:'李四',tm:'2026-04-21 14:30',dur:'0h 22m',loss:null,progress:22,ep:3,lr:'1e-4',ds:'用户画像数据集',dv:'Version2',gpu:'A100 × 1',stTm:'2026-04-21 14:30',edTm:'—',outNm:'用户画像生成',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:1},
  {id:'ft-20260420-018',nm:'合规审查对齐',desc:'使用 DPO 方法进行合规偏好对齐',model:'Qwen3-8B',method:'DPO',mode:'LoRA',st:'running',cr:'王颖',tm:'2026-04-20 08:00',dur:'—',loss:0.145,progress:33,ep:3,lr:'5e-5',ds:'合规偏好数据集',dv:'Version1',gpu:'A100 × 2',stTm:'2026-04-20 08:00',edTm:'—',outNm:'合规审查对齐',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260419-019',nm:'搜索排序调优-V3',desc:'基于 DeepSeek-R1-7B 的搜索排序 LoRA 调优',model:'DeepSeek-R1-7B',method:'SFT',mode:'LoRA',st:'completed',cr:'小红',tm:'2026-04-19 11:45',dur:'2h 30m',loss:0.051,progress:100,ep:4,lr:'1e-4',ds:'搜索排序训练集',dv:'Version3',gpu:'A100 × 2',stTm:'2026-04-19 11:45',edTm:'2026-04-19 06:15',outNm:'搜索排序调优-V3',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260418-020',nm:'报告摘要生成',desc:'基于 Qwen3-14B 的报告摘要 LoRA 调优',model:'Qwen3-14B',method:'SFT',mode:'LoRA',st:'pending',cr:'张三',tm:'2026-04-18 16:00',dur:'—',loss:null,progress:0,ep:3,lr:'1e-4',ds:'报告摘要数据集',dv:'Version2',gpu:'A100 × 2',stTm:'—',edTm:'—',outNm:'报告摘要生成',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:2},
  {id:'ft-20260417-021',nm:'客服情绪识别',desc:'基于 Doubao-Lite 的情绪识别 LoRA 调优',model:'Doubao-Lite-4K',method:'SFT',mode:'LoRA',st:'completed',cr:'小明',tm:'2026-04-17 09:20',dur:'1h 10m',loss:0.073,progress:100,ep:3,lr:'2e-4',ds:'情绪识别数据集',dv:'Version1',gpu:'A100 × 1',stTm:'2026-04-17 09:20',edTm:'2026-04-17 02:30',outNm:'客服情绪识别',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:1},
  {id:'ft-20260416-022',nm:'代码补全偏好-V2',desc:'使用 DPO 方法优化代码补全偏好',model:'DeepSeek-R1-32B',method:'DPO',mode:'LoRA',st:'terminated',cr:'小华',tm:'2026-04-16 13:50',dur:'0h 35m',loss:0.351,progress:65,ep:2,lr:'5e-5',ds:'代码补全偏好数据',dv:'Version2',gpu:'A100 × 4',stTm:'2026-04-16 13:50',edTm:'—',outNm:'代码补全偏好-V2',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:4},
  {id:'ft-20260415-023',nm:'风控规则微调',desc:'基于 Qwen3-8B 的风控规则全量调优',model:'Qwen3-8B',method:'SFT',mode:'全量参数',st:'completed',cr:'李四',tm:'2026-04-15 10:30',dur:'3h 45m',loss:0.025,progress:100,ep:5,lr:'5e-5',ds:'风控规则数据集',dv:'Version4',gpu:'A100 × 4',stTm:'2026-04-15 10:30',edTm:'2026-04-15 06:15',outNm:'风控规则微调',saveInt:200,expLim:5,resType:'公共资源',resPool:'',gpuModel:'A100',gpuC:4},
];
const MD=[
  {nm:'Qwen3-8B',desc:'通义千问3代 8B参数',methods:['SFT','DPO'],modes:['LoRA','全量参数']},
  {nm:'Qwen3-14B',desc:'通义千问3代 14B参数',methods:['SFT','DPO'],modes:['LoRA','全量参数']},
  {nm:'DeepSeek-R1-7B',desc:'DeepSeek R1 7B参数',methods:['SFT','DPO'],modes:['LoRA','全量参数']},
  {nm:'DeepSeek-R1-32B',desc:'DeepSeek R1 32B参数',methods:['SFT','DPO'],modes:['LoRA']},
  {nm:'Doubao-Pro-32K',desc:'豆包Pro 32K上下文',methods:['SFT'],modes:['LoRA','全量参数']},
  {nm:'Doubao-Lite-4K',desc:'豆包Lite 4K上下文',methods:['SFT'],modes:['LoRA']},
];
const DS=[
  {nm:'客服对话训练集',type:'SFT',n:12480,vs:['Version1','Version2','Version3'],ow:'王颖'},
  {nm:'代码偏好数据集',type:'DPO',n:8640,vs:['Version1','Version2'],ow:'张三'},
  {nm:'商品描述SFT数据',type:'SFT',n:5200,vs:['Version1'],ow:'李四'},
  {nm:'知识问答数据集',type:'SFT',n:9800,vs:['Version1','Version2','Version3','Version4','Version5'],ow:'小明'},
  {nm:'指标解读训练集',type:'SFT',n:3200,vs:['Version1','Version2'],ow:'小华'},
  {nm:'文案偏好数据',type:'DPO',n:6400,vs:['Version1'],ow:'王颖'},
  {nm:'摘要SFT数据',type:'SFT',n:7100,vs:['Version1','Version2','Version3','Version4'],ow:'小红'},
];
const CK=[
  {step:200,loss:0.152,tm:'10:12',sz:'1.2 GB',best:false,ver:'checkpoint-200'},
  {step:400,loss:0.089,tm:'10:55',sz:'1.2 GB',best:false,ver:'checkpoint-400'},
  {step:600,loss:0.054,tm:'11:38',sz:'1.2 GB',best:true,ver:'checkpoint-600'},
  {step:800,loss:0.038,tm:'12:20',sz:'1.2 GB',best:false,ver:'checkpoint-800'},
  {step:1000,loss:0.032,tm:'13:02',sz:'1.2 GB',best:false,ver:'checkpoint-1000'},
];

const SN=['基本信息','训练配置','数据配置','参数配置','产出配置','资源确认'];
let cStep=0, dTask=null, doneSteps=new Set();

// Form state
const F={name:'',desc:'',method:'SFT',model:'',mode:'LoRA',ds:'',dv:'',lr:'1e-4',ep:3,bs:4,msl:2048,wr:0.03,wd:0.01,lrR:8,lrA:16,lrD:0.05,lrT:'q_proj,v_proj',outNm:'',outDesc:'',saveCount:3,gpuT:'A100',gpuC:2,resMode:'public',resPool:'pool-a',gpuModel:'A100',valMode:'none',valRatio:10,valDs:'',valDv:'',evalCount:10,advShown:false};
